# Импортируем все модели, чтобы SQLAlchemy зарегистрировал их в Base.metadata.
from .Users import User
from .questions import (
    Question, AnswerOption, MatchingItem, MatchingPair,
    OrderingItem, ParameterizedTask, TaskParameter,
)
from .tests import Test, TestQuestion
from .testings import Testing, TestingTest
from .assignments import TestAssignment
from .attempts import (
    UserAnswer, StudentTextAnswer, StudentSelectedOption,
    StudentOrderingAnswer, StudentParameterizedAnswer, StudentMatchingAnswer,
)
from .results import ResultTest

__all__ = [
    "User", "Question", "AnswerOption", "MatchingItem", "MatchingPair",
    "OrderingItem", "ParameterizedTask", "TaskParameter", "Test",
    "TestQuestion", "Testing", "TestingTest", "TestAssignment",
    "UserAnswer", "StudentTextAnswer", "StudentSelectedOption",
    "StudentOrderingAnswer", "StudentParameterizedAnswer",
    "StudentMatchingAnswer", "ResultTest",
]
