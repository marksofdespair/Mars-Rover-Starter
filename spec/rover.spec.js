const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  //test #7
  it('constructor sets position and default values for mode and generatorWatts', function() {
    // Create a new Rover object
    const rover = new Rover(98382);

    // Check if the properties are set as expected
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });

  //test #8
  it('response returned by receiveMessage contains the name of the message', function() {
    // Create a Rover object
    const rover = new Rover(98382);
    // Create a Message object
    const message = new Message('Test message with two commands', []);
    // Use receiveMessage to get a response
    const response = rover.receiveMessage(message);

    // Check if the response contains the message name
    expect(response.message).toBe('Test message with two commands');
  });

  //test #9
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    // Create a Rover object
    const rover = new Rover(98382);

    // Create a Message object with two commands
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);

    // Use receiveMessage to get a response
    const response = rover.receiveMessage(message);

    // Check if the response contains two results
    expect(response.results.length).toBe(2);
  });

  //test #10
  it('responds correctly to the status check command', function() {
    // Create a Rover object
    const rover = new Rover(98382);

    // Create a Message object with the STATUS_CHECK command
    const commands = [new Command('STATUS_CHECK')];
    const message = new Message('Test message with STATUS_CHECK command', commands);

    // Use receiveMessage to get a response
    const response = rover.receiveMessage(message);

    // Check if the response contains roverStatus with accurate information
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(98382);
  });

  //test #11
  it('responds correctly to the mode change command', function() {
    // Create a Rover object
    const rover = new Rover(98382);

    // Create a Message object with the MODE_CHANGE command
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    const message = new Message('Test message with MODE_CHANGE command', commands);

    // Use receiveMessage to get a response
    const response = rover.receiveMessage(message);

    // Check if the response contains accurate information
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });

  //test #12
  it('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
    // Create a Rover object in LOW_POWER mode
    const rover = new Rover(98382);
    rover.mode = 'LOW_POWER';

    // Create a Message object with a MOVE command
    const commands = [new Command('MOVE', 100)];
    const message = new Message('Test message with MOVE command in LOW_POWER mode', commands);

    // Use receiveMessage to get a response
    const response = rover.receiveMessage(message);

    // Check if the response contains a false completed value and rover's position did not change
    expect(response.results[0].completed).toBe(false);
    expect(rover.position).toBe(98382); // Position should not change in LOW_POWER mode
  });

  //test #13
  it('responds with the position for the move command', function() {
    // Create a Rover object with an initial position
    const rover = new Rover(98382);
    // Create a Message object with a MOVE command
    const commands = [new Command('MOVE', 100)]; // Move to a new position
    const message = new Message('Test message with MOVE command', commands);
    // Use receiveMessage to get a response
    const response = rover.receiveMessage(message);

    // Check if the response contains the updated position
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toBe(100); // Check if the position has been updated to the specified value
  });
});