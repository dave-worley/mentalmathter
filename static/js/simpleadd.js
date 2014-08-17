App = Ember.Application.create({
  rootElement: '#app'
});
App.Router.reopen({
  rootURL: '/problems/simple/add/'
});
App.Router.map(function () {
  this.route('problem', {path: '/'});
});
App.ProblemRoute = Ember.Route.extend({
  model: function () {
    return problem;
  },
  renderTemplate: function () {
    this.render();
    this.render('problem', {
      into: 'application',
      outlet: 'problem'
    });
    this.render('explanation', {
      into: 'application',
      outlet: 'explanation'
    });
    this.render('feedback', {
      into: 'application',
      outlet: 'feedback'
    });
  }
});
App.problem = Ember.Object.extend({
  'operands': [
    Math.round(Math.random() * 89 + 10),
    Math.round(Math.random() * 89 + 10)
  ],
  'positions': function () {
    var positions = [];
    $.each(this.get('operands'), function (i, operand) {
      return positions.push({
        'ones': operand % 10,
        'tens': (Math.floor(operand / 10) * 10)
      });
    });
    return positions;
  }.property('operands'),
  'remake': function () {
    this.set('operands', [
    Math.round(Math.random() * 89 + 10),
    Math.round(Math.random() * 89 + 10)
  ])
  },
  feedback: null,
  'updateFeedback': function () {
    var sum, answer;
    sum = 0;
    answer = parseInt($('#answer').val());
    $.each(this.get('operands'), function (i, operand) {
      sum += operand;
    });
    if (sum === answer) {
      return this.set('feedback',{
        'success': true,
        'message': 'Correct!'
      });
    } else {
      return this.set('feedback',{
        'success': false,
        'message': 'Incorrect!'
      });
    }
  }
});
var problem = App.problem.create();
App.ProblemView = Ember.View.extend({
  submit: function (evt) {
    evt.preventDefault();
    problem.updateFeedback();
    problem.remake();
    $('#answer').val('').focus();
  }
});
//(function ($) {
//  $(function () {
//    var ProblemHandler = function () {
//      this.upperLimit = 89;
//      this.lowerLimit = 10;
//      this.operands = [
//        Math.round(Math.random() * this.upperLimit + this.lowerLimit),
//        Math.round(Math.random() * this.upperLimit + this.lowerLimit)
//      ];
//      this.problemNode = $('<div>').addClass('problem');
//      this.makeProblem();
//      return this;
//    };
//    ProblemHandler.prototype.makeProblem = function () {
//      var operanddiv, self, operand;
//      self = this;
//
//      $.each(self.operands, function (i, operand) {
//        operanddiv = $('<div>').addClass('operand');
//        operanddiv.text(operand)
//        self.problemNode.append(operanddiv);
//        if (i !== self.operands.length - 1) {
//          self.problemNode.append($('<div>').text(' + ').addClass('operation'));
//        } else {
//          self.problemNode.append('<hr>');
//        }
//      });
//      for (var i = 0; i < this.operands.length; i++) {
//        operand = $('div.operand');
//        operand.text(this.operands[i]);
//      }
//      return this.problemNode;
//    };
//    ProblemHandler.prototype.showFeedback = function (callback) {
//      var sum = 0;
//      $.each(this.operands, function (i, operand) {
//        sum += operand;
//      });
//      this.makeFeedbackDiv(sum, 'Correct!', 'Inorrect!');
//      $('div.feedback').fadeIn(function () {
//        callback();
//      });
//    };
//    ProblemHandler.prototype.makeFeedbackDiv = function (sum, successMessage, failMessage) {
//      var feedback, feedbackdiv;
//      feedback = $('<div>').addClass('alert');
//      if (sum == $('#answer').val()) {
//        feedback.addClass('alert-success');
//        feedback.text(successMessage);
//      } else {
//        feedback.addClass('alert-danger');
//        feedback.text(failMessage);
//      }
//      feedbackdiv = $('div.feedback div.col-md-12').empty();
//      feedbackdiv.append(feedback);
//    };
//    var main = function () {
//      var problem;
//      problem = new ProblemHandler();
//      $('form.problem').find('div.problem').remove();
//      $('form.problem').prepend(problem.problemNode);
//      $('form.problem').off('submit');
//      $('form.problem').on('submit', function (evt) {
//        evt.preventDefault();
//        problem.showFeedback(main);
//      });
//      $('#answer').val('').focus();
//    };
//    main();
//  });
//})(jQuery);