from rest_framework import serializers
from polls.models import Question, Choice, Vote
from rest_framework.fields import CurrentUserDefault

from django.shortcuts import get_object_or_404


class ChoiceSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    choice_text = serializers.CharField(max_length=200)
    votes = serializers.IntegerField(default=0)

    def create(self, validated_data):
        return Choice.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


class QuestionSerializerToShowList(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    owner_name = serializers.CharField(max_length=1000)
    question_text = serializers.CharField(max_length=500)
    pub_date = serializers.DateTimeField()


class QuestionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    owner_name = serializers.CharField(max_length=1000)
    question_text = serializers.CharField(max_length=500)
    pub_date = serializers.DateTimeField()
    votes = serializers.IntegerField(default=0)
    active = serializers.BooleanField(default=True)

    def create(self, validated_data):
        return Question.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


class ChoiceSerializerWithVotes(ChoiceSerializer):
    votes = serializers.IntegerField(read_only=True)


class New(serializers.ModelSerializer):
    user_choice = serializers.SerializerMethodField(
        method_name='get_some_field')

    class Meta:
        model = Question
        fields = ['id', 'owner', 'owner_name', 'question_text',
                  'pub_date', 'user_choice', 'choices']

    # id = serializers.IntegerField(read_only=True)
    # owner_name = serializers.CharField(max_length=1000)
    # question_text = serializers.CharField(max_length=500)
    # pub_date = serializers.DateTimeField()

    def get_some_field(self, instance: Question):
        request = self.context.get('request', None)
        if request and hasattr(request, "user"):
            user = request.user

        user_choice = -1
        try:
            vote = instance.vote_set.get(owner=user)
            user_choice = vote.choice.id
        except Vote.DoesNotExist:
            user_choice = -1

        return user_choice


class DetailSerializer(New):
    choices = ChoiceSerializerWithVotes(many=True, read_only=True)


class VoteSerializer(serializers.Serializer):
    choice_id = serializers.IntegerField()

    def create(self, validated_data):
        return Vote.objects.create(**validated_data)


class ResultSerializer(QuestionSerializer):
    choices = ChoiceSerializerWithVotes(many=True, read_only=True)
