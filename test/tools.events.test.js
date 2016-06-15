/**
 * Created by Jim Ankrom on 3/1/2016.
 */
describe('toolbox.events', function () {

    it('exists', function () {
        expect(cosinedesign.toolbox.events).toBeDefined();
    });

    it('events an object', function () {
        var result = null,
            testValue = 'hello world',
            sut = {
                doStuff: function () {
                    this.trigger('testEvent', testValue);
                }
            };

        cosinedesign.toolbox.events(sut, {
            testEvent: function (data) {
                result = data;
            }
        });

        sut.doStuff();

        expect(result).toBe(testValue);
    });
    describe('add', function () {
        it('adds an event handler', function () {
            var result = null,
                testValue = 'hello world',
                sut = {
                    doStuff: function () {
                        this.trigger('testEvent', testValue);
                    }
                };

            cosinedesign.toolbox.events(sut,{});

            sut.on('testEvent', function (){
                result = testValue;
            });

            sut.doStuff();

            expect(result).toBe(testValue);
        });
    });

});