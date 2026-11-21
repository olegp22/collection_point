import uuid

from sqlalchemy import Enum as SAEnum, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base
from .enums import UserRole
from .assignments import TestAssignment
from .results import ResultTest

class User(Base):
    __tablename__ = "Users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    role: Mapped[UserRole] = mapped_column(
        SAEnum(UserRole, name="role_user", values_callable=lambda enum: [e.value for e in enum]),
        nullable=False,
        default=UserRole.student,
        server_default="student",
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    surname: Mapped[str] = mapped_column(Text, nullable=False)
    patronymic: Mapped[str | None] = mapped_column(Text, nullable=True)
    password: Mapped[str] = mapped_column(Text, nullable=False)

    results: Mapped[list["ResultTest"]] = relationship(back_populates="User")
    assignments: Mapped[list["TestAssignment"]] = relationship(back_populates="User")
