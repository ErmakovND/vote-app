from polls.models import (
    Question,
    Choice,
    Vote
)
from .serializers import (
    QuestionSerializer,
    QuestionSerializerToShowList,
    DetailSerializer,
    ChoiceSerializer,
    VoteSerializer,
    ResultSerializer,
    New
)
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, redirect
from rest_framework.decorators import api_view
import json
import django.contrib.messages
from django.views.decorators.csrf import csrf_exempt


@api_view(['GET'])
def get_all_questions(request):
    if request.method == 'GET':
        questions = Question.objects.all()

        serializer = DetailSerializer(
            questions, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_own_questions(request):
    if request.method == 'GET':
        own_questions = Question.objects.filter(owner=request.user)
        serializer = DetailSerializer(
            own_questions, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_question_details(request, question_id):
    question = get_object_or_404(Question, pk=question_id)

    user_choice = -1
    try:
        vote = Vote.objects.get(owner=request.user, question=question)
        user_choice = vote.choice.id
    except Vote.DoesNotExist:
        user_choice = -1

    if request.method == 'GET':
        serializer = DetailSerializer(question)
        new_response = {'my_choice': user_choice}
        new_response.update(serializer.data)
        return Response(new_response)


@api_view(['POST'])
def create_question(request):
    if request.method == 'POST':
        data = request.data
        data['owner_id'] = request.user.id
        data['owner_name'] = request.user.username
        serializer = QuestionSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            question = serializer.save(owner_id=request.user.id)
            return Response(QuestionSerializer(question).data)


@api_view(['POST'])
def edit_question(request, question_id):
    question = get_object_or_404(Question, pk=question_id)

    if request.user != question.owner:
        return redirect('http://127.0.0.1:8000/polls/list/')

    if request.method == 'POST':
        serializer = QuestionSerializer(
            question, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            question = serializer.save()
            return Response(QuestionSerializer(question).data)


@api_view(['DELETE'])
def delete_question(request, question_id):
    question = get_object_or_404(Question, pk=question_id)

    if request.user != question.owner:
        return redirect('http://127.0.0.1:8000/polls/list/')

    if request.method == 'DELETE':
        question.delete()
        return Response("Question deleted")


@api_view(['GET'])
def question_results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)

    if request.user != question.owner:
        return redirect('http://127.0.0.1:8000/polls/list/')

    if question.active is True:
        question.active = False
        question.save()

    serializer = ResultSerializer(question)
    return Response(serializer.data)


@api_view(['POST'])
def create_choice(request, question_id):
    question = get_object_or_404(Question, pk=question_id)

    if request.user != question.owner:
        return redirect('http://127.0.0.1:8000/polls/list/')

    if request.method == 'POST':
        serializer = ChoiceSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            choice = serializer.save(question=question)
            return Response(ChoiceSerializer(choice).data)


@api_view(['POST'])
def edit_choice(request, choice_id):
    choice = get_object_or_404(Choice, pk=choice_id)
    question = get_object_or_404(Question, pk=choice.question.id)

    if request.user != question.owner:
        return redirect('http://127.0.0.1:8000/polls/list/')

    if request.method == 'POST':
        serializer = ChoiceSerializer(choice, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            choice = serializer.save()
            return Response(ChoiceSerializer(choice).data)


@api_view(['DELETE'])
def delete_choice(request, choice_id):
    choice = get_object_or_404(Choice, pk=choice_id)
    question = get_object_or_404(Question, pk=choice.question.id)

    if request.user != question.owner:
        return redirect('http://127.0.0.1:8000/polls/list/')

    if request.method == 'DELETE':
        choice.delete()
        return Response("Choice deleted")

@csrf_exempt
@api_view(['POST'])
def leave_vote(request, question_id):
    serializer = VoteSerializer(data=request.data)
    question = get_object_or_404(Question, pk=question_id)

    if not question.check_user_can_vote(request.user):
        #messages.error(request, "You have already voted!")
        return redirect('http://127.0.0.1:8000/polls/list/')

    if serializer.is_valid(raise_exception=True):
        choice = get_object_or_404(
            Choice, pk=serializer.validated_data['choice_id'],
            question=question)
        choice.votes += 1
        choice.save()
        # question.votes += 1
        # question.save()
        serializer.save(owner=request.user,
                        question=question, choice=choice)

        return Response("Voted")
