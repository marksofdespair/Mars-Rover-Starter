const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    //test #1
    //Already written. Per description, throws error if a name is not passed into constructor as 1st param.
    it('throws an error if a name is NOT passed into the constructor as the first parameter', function() {
      function createMessageWithoutName() {
        new Message();
      }
  
      // Use expect().toThrow() to check if an error is thrown 
      expect(createMessageWithoutName).toThrowError('Name is required.');
    });
  
    //test #2
    //Checks that the constructor in the Command class correctly sets the commandType property in the new object.
    it('constructor sets name', function() {
      function createMessageWithName() {
        const name = 'Test Message';
        const message = new Message(name);
        return message.name;
      }
  
      expect(createMessageWithName()).toBe('Test Message');
    });
  
    //test #3
    //Checks that the constructor correctly sets the value property in the new object.
    it('contains a commands array passed into the constructor as the 2nd argument', function() {
      function createMessageWithCommands() {
        const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        const message = new Message('Test Message', commands);
        return message.commands;
      }
  
      // Use expect().toEqual() to check if the commands property is set as expected
      expect(createMessageWithCommands()).toEqual([
        new Command('MODE_CHANGE', 'LOW_POWER'),
        new Command('STATUS_CHECK')
      ]);
    });
  });
  