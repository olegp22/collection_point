from decimal import Decimal

from sqlalchemy import CheckConstraint, Enum as SAEnum, ForeignKey, Numeric, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base
from .enums import GradingMode
from .results import ResultTest
from .testings import TestingTest
from .assignments import TestAssignment
from .questions import Question

class Test(Base):
    __tablename__ = "Tests"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(unique=True, nullable=False)
    description: Mapped[str | None]
    instruction: Mapped[str | None]
    specialty: Mapped[str | None]

    question_links: Mapped[list["TestQuestion"]] = relationship(back_populates="test", cascade="all, delete-orphan")
    testing_links: Mapped[list["TestingTest"]] = relationship(back_populates="test")
    results: Mapped[list["ResultTest"]] = relationship(back_populates="test")
    assignments: Mapped[list["TestAssignment"]] = relationship(back_populates="test")


class TestQuestion(Base):
    __tablename__ = "TestQuestions"
    __table_args__ = (
        CheckConstraint("max_score_question >= 0", name="ck_test_question_max_score"),
        CheckConstraint("penalty_per_error >= 0", name="ck_test_question_penalty"),
    )

    test_id: Mapped[int] = mapped_column(ForeignKey("Tests.id"), primary_key=True)
    question_id: Mapped[int] = mapped_column(ForeignKey("Questions.id"), primary_key=True)
    is_required: Mapped[bool] = mapped_column(Boolean, default=False, server_default="false")
    mode: Mapped[GradingMode] = mapped_column(
        SAEnum(GradingMode, name="grading_mode",
               values_callable=lambda enum: [e.value for e in enum]),
        default=GradingMode.all_or_nothing,
        server_default="all_or_nothing",
        nullable=False,
    ) # как оценивать, снимать за каждую ошибку или за ошибку сразу 0 баллов
    max_score_question: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    penalty_per_error: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=0, server_default="0")

    test: Mapped["Test"] = relationship(back_populates="question_links")
    question: Mapped["Question"] = relationship(back_populates="test_links")
