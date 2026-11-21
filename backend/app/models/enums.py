from enum import Enum


class UserRole(str, Enum):
    admin = "admin"
    teacher = "teacher"
    student = "student"


class QuestionType(str, Enum):
    single_choice = "single_choice"
    multiple_choice = "multiple_choice"
    text_input = "text_input"
    matching = "matching"
    ordering = "ordering"
    parameterized_task = "parameterized_task"


class MatchingSide(str, Enum):
    left = "left"
    right = "right"


class GradingMode(str, Enum):
    all_or_nothing = "all_or_nothing"
    partial_credit = "partial_credit"


class TestingStatus(str, Enum):
    draft = "draft"
    published = "published"
    archived = "archived"


class AssignmentStatus(str, Enum):
    assigned = "assigned"
    started = "started"
    completed = "completed"


class AssignmentSource(str, Enum):
    automatically = "automatically"
    manually = "manually"
