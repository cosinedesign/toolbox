/**
 * Created by Jim Ankrom on 2/3/2016.
 */

describe('lifecycle', function () {
    it('executes in order', function () {

        var results = [],
            sut = cosinedesign.toolbox.lifecycle(['first', 'second', 'third'], {
                first: function () {
                    results.push('first');
                },
                second: function () {
                    results.push('second');
                },
                third: function () {
                    results.push('third');
                }
        });

        sut();

        expect(results.length).toBe(3);
        expect(results[0]).toBe('first');
        expect(results[1]).toBe('second');
        expect(results[2]).toBe('third');
    });

    it("doesn't share phases with others", function () {
        var results = [],
            sut = cosinedesign.toolbox.lifecycle(['first', 'second', 'third'], {
                first: function () {
                    results.push('first');
                },
                second: function () {
                    results.push('second');
                },
                third: function () {
                    results.push('third');
                }
            }),
            sut2 = cosinedesign.toolbox.lifecycle(['before', 'after'], {
                before: function () {
                    results.push('fourth');
                },
                after: function () {
                    results.push('fifth');
                }
            }),
            sut3 = cosinedesign.toolbox.lifecycle(['first', 'second', 'third'], {
                first: function () {
                    results.push('sixth');
                },
                second: function () {
                    results.push('seventh');
                },
                third: function () {
                    results.push('eighth');
                }
            });

        sut();
        sut2();
        sut3();

        expect(results.length).toBe(8);
        expect(results[0]).toBe('first');
        expect(results[1]).toBe('second');
        expect(results[2]).toBe('third');
        expect(results[3]).toBe('fourth');
        expect(results[4]).toBe('fifth');
        expect(results[5]).toBe('sixth');
        expect(results[6]).toBe('seventh');
        expect(results[7]).toBe('eighth');
    });
    it('can be reordered', function () {

    });
});