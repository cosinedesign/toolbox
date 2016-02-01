/**
 * Created by Jim Ankrom on 1/31/2016.
 */

describe('multicast', function () {

    it('executes callback when invoked', function () {
        var wasCalled = false,
            fut = cosinedesign.toolbox.multicast(function () {
                wasCalled = true;
            });

        fut();

        expect(wasCalled).toBeTruthy();
    });

    it('executes multiple callbacks', function () {
        var wasCalled = false,
            fut = cosinedesign.toolbox.multicast(function () {
                wasCalled = true;
            })
            .add(function () {
                if (wasCalled) wasCalled = "doubletrue";
            });

        fut();

        expect(wasCalled).toBe("doubletrue");
    });

    it('executes multiple callbacks in order', function () {
        var wasCalled = false,
            fut = cosinedesign.toolbox.multicast(function () {
                    wasCalled = "one";
                })
                .add(function () {
                    if (wasCalled) wasCalled += "two";
                });

        fut();

        expect(wasCalled).toBe("onetwo");
    });

    it('does not execute when disabled', function () {
        var wasCalled = false,
            fut = cosinedesign.toolbox.multicast(function () {
                wasCalled = true;
            });

        fut.disable();
        fut();

        expect(wasCalled).toBeFalsy();

        fut.enable()();
        expect(wasCalled).toBeTruthy();

    });
});
