import uuid
from decimal import Decimal

from sqlalchemy import Boolean, ForeignKey, Numeric, DateTime, Integer, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base
from .users import User
from .tests import Test
from .testings import Testing
from .attempts import UserAnswer

class ResultTest(Base):
    __tablename__ = "ResultTest"
    __table_args__ = (
        CheckConstraint("total_score >= 0", name="ck_result_total_score"),
        CheckConstraint("max_score >= 0", name="ck_result_max_score"),
        CheckConstraint("percent >= 0", name="ck_result_percent"),
        CheckConstraint("attempt_number >= 1", name="ck_result_attempt_number"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    testing_id: Mapped[int] = mapped_column(ForeignKey("Testings.id"), nullable=False)
    test_id: Mapped[int] = mapped_column(ForeignKey("Tests.id"), nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("Users.id"), nullable=False)
    total_score: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    max_score: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    percent: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))# процент правельных ответоа
    passed: Mapped[bool] = mapped_column(Boolean, nullable=False)# успешно ли пройден тест 
    started_at: Mapped[object | None] = mapped_column(DateTime)
    completed_at: Mapped[object | None] = mapped_column(DateTime)
    attempt_number: Mapped[int] = mapped_column(Integer, nullable=False, default=1, server_default="1")

    testing: Mapped["Testing"] = relationship(back_populates="results")
    test: Mapped["Test"] = relationship(back_populates="results")
    user: Mapped["User"] = relationship(back_populates="results")
    answers: Mapped[list["UserAnswer"]] = relationship(back_populates="result", cascade="all, delete-orphan")
