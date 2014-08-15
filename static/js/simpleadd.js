(function ($) {
  $(function () {
    var ProblemHandler = function () {
      this.upperLimit = 99;
      this.lowerLimit = 10;
      this.operands = [
        Math.round(Math.random() * this.upperLimit + this.lowerLimit),
        Math.round(Math.random() * this.upperLimit + this.lowerLimit)
      ];
      this.problemNode = $('<div>').addClass('problem');
      this.makeProblem();
      return this;
    };
    ProblemHandler.prototype.makeProblem = function () {
      var operanddiv, self, operand;
      self = this;

      $.each(self.operands, function (i, operand) {
        operanddiv = $('<div>').addClass('operand');
        operanddiv.text(operand)
        self.problemNode.append(operanddiv);
        if (i !== self.operands.length - 1) {
          self.problemNode.append($('<div>').text(' + ').addClass('operation'));
        } else {
          self.problemNode.append('<hr>');
        }
      });
      for (var i = 0; i < this.operands.length; i++) {
        operand = $('div.operand');
        operand.text(this.operands[i]);
      }
      return this.problemNode;
    };
    var main = function () {
      var problem = new ProblemHandler();
      $('form.problem').find('div.problem').remove();
      $('form.problem').prepend(problem.problemNode);
      $('form.problem').off('submit');
      $('form.problem').on('submit', function (evt) {
        evt.preventDefault();
        var feedback, sum;
        sum = 0;
        for (var i = 0; i < problem.operands.length; i++) {
          sum += problem.operands[i];
        }
        feedback = $('<div>').addClass('alert');
        if (sum == $('#answer').val()) {
          feedback.addClass('alert-success');
          feedback.text('Correct!');
        } else {
          feedback.addClass('alert-danger');
          feedback.text('Inorrect!');
        }
        $('div.feedback div.col-md-12').empty();
        $('div.feedback div.col-md-12').append(feedback);
        $('div.feedback').fadeIn(function () {
          main();
        });
      });
      $('#answer').val('').focus();
    };
    main();
  });
})(jQuery);