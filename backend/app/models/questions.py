from sqlalchemy import (
    Boolean, CheckConstraint, Enum as SAEnum, ForeignKey, Integer, Text,
    UniqueConstraint
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base
from .enums import QuestionType, MatchingSide
from .attempts import (UserAnswer, StudentSelectedOption,
                       StudentOrderingAnswer)
from .tests import TestQuestion

class Question(Base):
    __tablename__ = "Questions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    text: Mapped[str | None] = mapped_column(Text, nullable=True)
    type: Mapped[QuestionType] = mapped_column(
        SAEnum(QuestionType, name="type_questions",
               values_callable=lambda enum: [e.value for e in enum]),
        nullable=False,
    )

    answer_options: Mapped[list["AnswerOption"]] = relationship(back_populates="question", cascade="all, delete-orphan")
    matching_items: Mapped[list["MatchingItem"]] = relationship(back_populates="question", cascade="all, delete-orphan")
    ordering_items: Mapped[list["OrderingItem"]] = relationship(back_populates="question", cascade="all, delete-orphan")
    parameterized_task: Mapped["ParameterizedTask | None"] = relationship(back_populates="question", uselist=False, cascade="all, delete-orphan")
    test_links: Mapped[list["TestQuestion"]] = relationship(back_populates="question")
    user_answers: Mapped[list["UserAnswer"]] = relationship(back_populates="question")


class AnswerOption(Base):
    __tablename__ = "AnswerOptions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_questions: Mapped[int] = mapped_column(ForeignKey("Questions.id"), nullable=False)
    value: Mapped[str] = mapped_column(Text, nullable=False)
    is_correct: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False, server_default="false")

    question: Mapped["Question"] = relationship(back_populates="answer_options")
    selected_by: Mapped[list["StudentSelectedOption"]] = relationship(back_populates="answer_option")


class MatchingItem(Base):
    __tablename__ = "MatchingItem"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_questions: Mapped[int] = mapped_column(ForeignKey("Questions.id"), nullable=False)
    value: Mapped[str] = mapped_column(Text, nullable=False)
    side: Mapped[MatchingSide] = mapped_column(
        SAEnum(MatchingSide, name="matching_side",
               values_callable=lambda enum: [e.value for e in enum]),
        nullable=False,
    )

    question: Mapped["Question"] = relationship(back_populates="matching_items")
    left_pairs: Mapped[list["MatchingPair"]] = relationship(
        foreign_keys="MatchingPair.left_item_id", back_populates="left_item"
    )
    right_pairs: Mapped[list["MatchingPair"]] = relationship(
        foreign_keys="MatchingPair.right_item_id", back_populates="right_item"
    )


class MatchingPair(Base):
    __tablename__ = "MatchingPair"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    left_item_id: Mapped[int] = mapped_column(ForeignKey("MatchingItem.id"), nullable=False)
    right_item_id: Mapped[int] = mapped_column(ForeignKey("MatchingItem.id"), nullable=False)

    left_item: Mapped["MatchingItem"] = relationship(foreign_keys=[left_item_id], back_populates="left_pairs")
    right_item: Mapped["MatchingItem"] = relationship(foreign_keys=[right_item_id], back_populates="right_pairs")


class OrderingItem(Base):
    __tablename__ = "OrderingItem"
    __table_args__ = (
        UniqueConstraint("id_questions", "correct_position", name="uq_ordering_question_position"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_questions: Mapped[int] = mapped_column(ForeignKey("Questions.id"), nullable=False)
    value: Mapped[str] = mapped_column(Text, nullable=False)
    correct_position: Mapped[int] = mapped_column(Integer, nullable=False)

    question: Mapped["Question"] = relationship(back_populates="ordering_items")
    student_answers: Mapped[list["StudentOrderingAnswer"]] = relationship(back_populates="item")


class ParameterizedTask(Base):
    __tablename__ = "ParameterizedTask"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_questions: Mapped[int] = mapped_column(ForeignKey("Questions.id"), nullable=False, unique=True)
    template: Mapped[str] = mapped_column(Text, nullable=False)
    answer_formula: Mapped[str] = mapped_column(Text, nullable=False)

    question: Mapped["Question"] = relationship(back_populates="parameterized_task")
    parameters: Mapped[list["TaskParameter"]] = relationship(back_populates="task", cascade="all, delete-orphan")


class TaskParameter(Base):
    __tablename__ = "TaskParameter"
    __table_args__ = (
        UniqueConstraint("task_id", "name", name="uq_task_parameter_name"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    task_id: Mapped[int] = mapped_column(ForeignKey("ParameterizedTask.id"), nullable=False)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    min_value: Mapped[int | None] = mapped_column(Integer, nullable=True)
    max_value: Mapped[int | None] = mapped_column(Integer, nullable=True)

    task: Mapped["ParameterizedTask"] = relationship(back_populates="parameters")
