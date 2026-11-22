from decimal import Decimal

from sqlalchemy import (
    Boolean, ForeignKey, Integer, Numeric, Text, UniqueConstraint, CheckConstraint
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .results import ResultTest
    from .questions import (Question, AnswerOption, OrderingItem)

class UserAnswer(Base):
    __tablename__ = "UserAnswers"
    __table_args__ = (
        UniqueConstraint("result_test_id", "question_id", name="uq_user_answer_result_question"),
        CheckConstraint("score >= 0", name="ck_user_answer_score"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    result_test_id: Mapped[object] = mapped_column(ForeignKey("ResultTest.id"), nullable=False)
    question_id: Mapped[int] = mapped_column(ForeignKey("Questions.id"), nullable=False)
    score: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    is_correct: Mapped[bool] = mapped_column(Boolean, nullable=False)

    result: Mapped["ResultTest"] = relationship(back_populates="answers")
    question: Mapped["Question"] = relationship(back_populates="user_answers")
    text_answer: Mapped["StudentTextAnswer | None"] = relationship(back_populates="user_answer", uselist=False, cascade="all, delete-orphan")
    selected_options: Mapped[list["StudentSelectedOption"]] = relationship(back_populates="user_answer", cascade="all, delete-orphan")
    ordering_answers: Mapped[list["StudentOrderingAnswer"]] = relationship(back_populates="user_answer", cascade="all, delete-orphan")
    parameterized_answer: Mapped["StudentParameterizedAnswer | None"] = relationship(back_populates="user_answer", uselist=False, cascade="all, delete-orphan")
    matching_answers: Mapped[list["StudentMatchingAnswer"]] = relationship(back_populates="user_answer", cascade="all, delete-orphan")


class StudentTextAnswer(Base):
    __tablename__ = "StudentTextAnswer"

    id_user_answer: Mapped[int] = mapped_column(ForeignKey("UserAnswers.id"), primary_key=True)
    content: Mapped[str | None] = mapped_column(Text)

    user_answer: Mapped["UserAnswer"] = relationship(back_populates="text_answer")


class StudentSelectedOption(Base):
    __tablename__ = "StudentSelectedOption"
    __table_args__ = (
        UniqueConstraint("id_user_answer", "answer_option_id", name="uq_selected_option_per_answer"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_user_answer: Mapped[int] = mapped_column(ForeignKey("UserAnswers.id"), nullable=False)
    answer_option_id: Mapped[int | None] = mapped_column(ForeignKey("AnswerOptions.id"), nullable=True)

    user_answer: Mapped["UserAnswer"] = relationship(back_populates="selected_options")
    answer_option: Mapped["AnswerOption | None"] = relationship(back_populates="selected_by")


class StudentOrderingAnswer(Base):
    __tablename__ = "StudentOrderingAnswer"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    is_user_answer: Mapped[int] = mapped_column("is_user_answer", ForeignKey("UserAnswers.id"), nullable=False)
    id_item: Mapped[int] = mapped_column(ForeignKey("OrderingItem.id"), nullable=False)
    position: Mapped[int | None] = mapped_column(Integer)

    user_answer: Mapped["UserAnswer"] = relationship(back_populates="ordering_answers")
    item: Mapped["OrderingItem"] = relationship(back_populates="student_answers")


class StudentParameterizedAnswer(Base):
    __tablename__ = "StudentParameterizedAnswer"

    student_answer_id: Mapped[int] = mapped_column(ForeignKey("UserAnswers.id"), primary_key=True)
    generated_parameters: Mapped[dict] = mapped_column(JSONB, nullable=False)
    answer: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))

    user_answer: Mapped["UserAnswer"] = relationship(back_populates="parameterized_answer")


class StudentMatchingAnswer(Base):
    __tablename__ = "StudentMatchingAnswer"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    student_answer_id: Mapped[int] = mapped_column(ForeignKey("UserAnswers.id"), nullable=False)
    left_item_id: Mapped[int] = mapped_column(ForeignKey("MatchingItem.id"), nullable=False)
    right_item_id: Mapped[int] = mapped_column(ForeignKey("MatchingItem.id"), nullable=False)

    user_answer: Mapped["UserAnswer"] = relationship(back_populates="matching_answers")
