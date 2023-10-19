const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it('throws an error if a name is NOT passed into the constructor as the first parameter', function() {
        function createMessageWithoutName() {
          new Message();
        }
    
        // Use expect().toThrow() to check if an error is thrown 
        expect(createMessageWithoutName).toThrowError('Name is required.');
      });

      it('constructor sets name', function() {
        function createMessageWithName() {
            const name = 'Test Message';
            const message = new Message(name);
            return message.name;

        }

        expect(createMessageWithName()).toBe('Test Message');
    });

        it('contains a commands array passed into the constructor as the 2nd argument', function() {
            function
        })

    });
});
