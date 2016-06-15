/**
 * Created by Jim Ankrom on 3/6/2016.
 */
describe('toolbox.pipe', function () {
    var toolbox = cosinedesign.toolbox;
    it('exists', function () {
        expect(toolbox.pipe).toBeDefined();
    });

    it('executes the first callback', function () {
        var result;
        var sut = cosinedesign.toolbox.pipe(function (data) {
            return data + ' world';
        });

        result = sut('hello');

        expect(result).toBe('hello world');
    });

    it('has a next', function () {
        var result;
        var sut = cosinedesign.toolbox.pipe(function (data) {
            return data + ' world';
        });

        expect(sut.next).toBeDefined();
        var next = sut.next();
        expect(next.next).toBeDefined();
        var next2 = next.next();
        expect(next2.next).toBeDefined();
    });

    it('executes in order if we remember the first instance', function () {
        var result=false,
            called1=false,
            called2=false;

        var sut = cosinedesign.toolbox.pipe(function (data) {
            called1 = true;
            //console.log('called1');
            result = data;
        });

        sut.next(function (data) {
            called2 = true;
            // console.log('called2');
            result += ' world';
        });

        sut('hello');

        expect(called1).toBeTruthy();
        expect(called2).toBeTruthy();
        expect(result).toBe('hello world');
    });

    it('executes in order', function () {
        var result=false,
            called1=false,
            called2=false;

        var sut = cosinedesign.toolbox.pipe(function (data) {
            called1 = true;
            //console.log('called1');
            result = data;
        }).next(function (data) {
            called2 = true;
            // console.log('called2');
            result += ' world';
        });

        sut('hello');

        expect(called1).toBeTruthy();
        expect(called2).toBeTruthy();
        expect(result).toBe('hello world');

    });

    it('passes data in order', function () {
        var sut = cosinedesign.toolbox.pipe(function (data) {
                return data + '2';
            })
            .next(function (data) {
                return data + '3';
            })
            .next(function (data) {
                return data + '4';
            });

        var results = sut('1');

        expect(results).toBe('1234');
    });

    describe('add', function () {
        it('exists', function () {
            var sut = cosinedesign.toolbox.pipe(function (data) {
                return data + '2';
            });
            expect(sut.add).toBeDefined();
        });

        // TODO: Why is there an 'add' when there's a 'next'??
        it('executes in order', function () {
            var sut = cosinedesign.toolbox.pipe(function (data) {
                    return data + '2';
                })
                .add(function (data) {
                    return data + '3';
                })
                .add(function (data) {
                    return data + '4';
                });

            var results = sut('1');

            expect(results).toBe('1234');

        });
    });

    // TODO: Pipeline - Accepts multiple parameters, passes them into each stage
});