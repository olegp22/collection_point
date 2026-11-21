from sqlalchemy import Enum as SAEnum, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base
from .enums import AssignmentSource, AssignmentStatus
from .users import User
from .tests import Test
from .testings import Testing

"""
Назначение тестов вручную или самостоятельное запись
"""
class TestAssignment(Base):
    __tablename__ = "TestAssigments"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    test_id: Mapped[int | None] = mapped_column(ForeignKey("Tests.id"), nullable=True)
    testing_id: Mapped[int | None] = mapped_column(ForeignKey("Testings.id"), nullable=True)
    user_id: Mapped[object] = mapped_column(ForeignKey("Users.id"), nullable=False)
    source: Mapped[AssignmentSource] = mapped_column(
        SAEnum(AssignmentSource, name="ReasonAppointment",
               values_callable=lambda enum: [e.value for e in enum]),
        default=AssignmentSource.automatically,
        server_default="automatically",
        nullable=False,
    )
    status: Mapped[AssignmentStatus] = mapped_column(
        SAEnum(AssignmentStatus, name="StatusImplementation",
               values_callable=lambda enum: [e.value for e in enum]),
        default=AssignmentStatus.assigned,
        server_default="assigned",
        nullable=False,
    )
    create_at: Mapped[object] = mapped_column(DateTime, server_default=func.current_timestamp())

    user: Mapped["User"] = relationship(back_populates="assignments")
    test: Mapped["Test | None"] = relationship(back_populates="assignments")
    testing: Mapped["Testing | None"] = relationship(back_populates="assignments")
