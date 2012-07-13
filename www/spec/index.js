describe('app', function() {
    it('should exist', function() {
        expect(app).toBeDefined();
    });

    describe('initialize', function() {
        it('should exist', function() {
            expect(app.initialize).toBeDefined();
        });

        it('should bind events', function() {
            spyOn(app, 'bind');
            app.initialize();
            expect(app.bind).toHaveBeenCalled();
        });
    });

    describe('bind', function() {
        it('should exist', function() {
            expect(app.bind).toBeDefined();
        });

        describe('deviceready', function() {
            it('should call app.event.deviceready on deviceready', function() {
                runs(function() {
                    spyOn(app.event, 'deviceready');
                    app.bind();
                    helper.trigger(window.document, 'deviceready');
                });
                waitsFor(function() {
                    return (app.event.deviceready.calls.length > 0);
                }, 'deviceready should be called once', 500);
                runs(function() {
                    expect(app.event.deviceready).toHaveBeenCalled();
                });
            });
        });
    });

    describe('event', function() {
        it('should exist', function() {
            expect(app.event).toBeDefined();
        });

        describe('deviceready', function() {
            it('should exist', function() {
                expect(app.event.deviceready).toBeDefined();
            });

            it('should report that it fired', function() {
                spyOn(app, 'report');
                app.event.deviceready();
                expect(app.report).toHaveBeenCalledWith('deviceready');
            });
        });
    });

    describe('report', function() {
        it('should exist', function() {
            expect(app.report).toBeDefined();
        });

        it('should report "ok" for the given ID', function() {
            document.getElementById('stage').innerHTML = '<span id="deviceready"></span>';
            app.report('deviceready');
            expect(document.getElementById('deviceready').innerHTML).toEqual('ok');
        });
    });
});
