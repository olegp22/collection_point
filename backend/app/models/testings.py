from sqlalchemy import Enum as SAEnum, ForeignKey, Integer, Text, CheckConstraint, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base
from .enums import TestingStatus
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .results import ResultTest
    from .assignments import TestAssignment
    from .tests import Test

class Testing(Base):
    __tablename__ = "Testings"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    status: Mapped[TestingStatus] = mapped_column(
        SAEnum(TestingStatus, name="status_testing",
               values_callable=lambda enum: [e.value for e in enum]),
        default=TestingStatus.draft,
        server_default="draft",
        nullable=False,
    )

    test_links: Mapped[list["TestingTest"]] = relationship(back_populates="testing", cascade="all, delete-orphan")
    results: Mapped[list["ResultTest"]] = relationship(back_populates="testing")
    assignments: Mapped[list["TestAssignment"]] = relationship(back_populates="testing")


class TestingTest(Base):
    __tablename__ = "TestingTest"
    __table_args__ = (
        CheckConstraint("order_index > 0", name="ck_testing_test_order"),
        CheckConstraint("time_limit_test >= 0", name="ck_testing_test_time_limit"),
    )

    testing_id: Mapped[int] = mapped_column(ForeignKey("Testings.id"), primary_key=True)
    test_id: Mapped[int] = mapped_column(ForeignKey("Tests.id"), primary_key=True)
    order_index: Mapped[int] = mapped_column(Integer, default=1, server_default="1") #порядок тестов в тестиование 
    time_limit_test: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    passing_score: Mapped[int] = mapped_column(Integer, nullable=False)# порого прохождения теста в этом тестирование 
    time_start: Mapped[object] = mapped_column(DateTime, server_default=func.current_timestamp())

    testing: Mapped["Testing"] = relationship(back_populates="test_links")
    test: Mapped["Test"] = relationship(back_populates="testing_links")
