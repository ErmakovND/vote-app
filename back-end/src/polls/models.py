from django.db import models
from django.contrib.auth.models import User


class Question(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    owner_name = models.CharField(max_length=500, default="none")
    question_text = models.CharField(max_length=500)
    pub_date = models.DateTimeField('date when published')
    votes = models.IntegerField(default=0)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.question_text

    def choices(self):
        if not hasattr(self, '_choices'):
            self._choices = self.choice_set.all()
        return self._choices

    def check_user_can_vote(self, user):
        user_votes = user.vote_set.all()
        vote_this_question = user_votes.filter(question=self)
        if vote_this_question.exists():
            return False
        else:
            return True

    def get_results(self):
        results = []
        for choice in self.choice_set.all():
            curr_dict = {}
            curr_dict['choice_text'] = choice.choice_text
            curr_dict['vote_count'] = choice.votes

            if self.votes != 0:
                curr_dict['%'] = 100 * curr_dict['vote_count'] / self.votes
            else:
                curr_dict['%'] = 0
            results.append(curr_dict)
        return results


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text


class Vote(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
