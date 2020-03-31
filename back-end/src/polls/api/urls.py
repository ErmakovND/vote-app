from . import views
from django.urls import include, path

urlpatterns = [
    path('list/', views.get_all_questions, name='все вопросы'),
    path('list/user/', views.get_own_questions,
         name='все вопросы пользователя'),
    path('add/', views.create_question, name='создать вопрос'),
    path('edit/<int:question_id>/', views.edit_question,
         name='изменить вопрос'),
    path('delete/<int:question_id>/',
         views.delete_question, name='удалить вопрос'),
    path('end/<int:question_id>/', views.question_results,
         name='завершить опрос, увидеть результаты'),
    path('add/<int:question_id>/choice/',
         views.create_choice, name='добавить ответ'),
    path('edit/choice/<int:choice_id>/',
         views.edit_choice, name='изменить ответ'),
    path('delete/choice/<int:choice_id>/',
         views.delete_choice, name='удалить ответ'),
    path('<int:question_id>/', views.get_question_details,
         name='посмотреть детали вопроса'),
    path('<int:question_id>/vote/', views.leave_vote, name='проголосовать'),
]
