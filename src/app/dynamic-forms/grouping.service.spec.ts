import {inject, TestBed} from '@angular/core/testing';

import {GroupingService} from './grouping.service';
import {TextBoxControl} from './controls/textbox-control';
import {GroupControl} from './controls/group-control';

let service: GroupingService;

describe('GroupingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GroupingService]
        });
        service = TestBed.get(GroupingService);
    });

    it('should be created', inject([GroupingService], () => {
        expect(service).toBeTruthy();
    }));


    describe('Group controls per row', () => {
        it('should group correctly one control per line', () => {
            const groupControl = new GroupControl({
                key: 'testGroup',
                groupControls: [
                    new TextBoxControl({
                        key: 'testTextBox1',
                        label: 'testLabel1'
                    }),
                    new TextBoxControl({
                        key: 'testTextBox2',
                        label: 'testLabel2'
                    })
                ],
                controlsPerRow: 1
            });

            const groupedControls = service.groupControls(groupControl);

            expect(groupedControls.length).toEqual(2);
            expect(groupedControls[0][0].key).toEqual('testTextBox1');
            expect(groupedControls[1][0].key).toEqual('testTextBox2');
        });

        it('should group correctly two controls per line', () => {
            const groupControl = new GroupControl({
                key: 'testGroup',
                groupControls: [
                    new TextBoxControl({
                        key: 'testTextBox1',
                        label: 'testLabel1'
                    }),
                    new TextBoxControl({
                        key: 'testTextBox2',
                        label: 'testLabel2'
                    }),
                    new TextBoxControl({
                        key: 'testTextBox3',
                        label: 'testLabel3'
                    })
                ],
                controlsPerRow: 2
            });
            const groupedControls = service.groupControls(groupControl);

            expect(groupedControls.length).toEqual(2);
            expect(groupedControls[0][0].key).toEqual('testTextBox1');
            expect(groupedControls[0][1].key).toEqual('testTextBox2');
            expect(groupedControls[1][0].key).toEqual('testTextBox3');
        });

        it('should group correctly when controls contain group in the beginning', () => {
            const groupControl = new GroupControl({
                    key: 'testGroup',
                    groupControls: [
                        new GroupControl({
                            key: 'testGroup1',
                            groupControls: [
                                new TextBoxControl({
                                    key: 'testGroupTextBox1',
                                    label: 'testGroupLabel1'
                                })
                            ]
                        }),
                        new TextBoxControl({
                            key: 'testTextBox1',
                            label: 'testLabel1'
                        }),

                        new TextBoxControl({
                            key: 'testTextBox2',
                            label: 'testLabel2'
                        }),

                    ],
                    controlsPerRow: 2
                },
            );

            const groupedControls = service.groupControls(groupControl);

            expect(groupedControls.length).toEqual(2);
            expect(groupedControls[0][0].key).toEqual('testGroup1');
            expect(groupedControls[1][0].key).toEqual('testTextBox1');
            expect(groupedControls[1][1].key).toEqual('testTextBox2');
        });

        it('should group correctly when controls contain group in the middle', () => {
            const groupControl = new GroupControl({
                key: 'testGroup',
                groupControls: [

                    new TextBoxControl({
                        key: 'testTextBox1',
                        label: 'testLabel1'
                    }),
                    new GroupControl({
                        key: 'testGroup1',
                        groupControls: [
                            new TextBoxControl({
                                key: 'testGroupTextBox1',
                                label: 'testGroupLabel1'
                            })
                        ]
                    }),
                    new TextBoxControl({
                        key: 'testTextBox2',
                        label: 'testLabel2'
                    }),

                ],
                controlsPerRow: 2
            });

            const groupedControls = service.groupControls(groupControl);

            expect(groupedControls.length).toEqual(3);
            expect(groupedControls[0][0].key).toEqual('testTextBox1');
            expect(groupedControls[1][0].key).toEqual('testGroup1');
            expect(groupedControls[2][0].key).toEqual('testTextBox2');
        });

        it('should group correctly when controls contain group in the end', () => {
            const groupControl = new GroupControl({
                key: 'testGroup',
                groupControls: [

                    new TextBoxControl({
                        key: 'testTextBox1',
                        label: 'testLabel1'
                    }),

                    new TextBoxControl({
                        key: 'testTextBox2',
                        label: 'testLabel2'
                    }),
                    new GroupControl({
                        key: 'testGroup1',
                        groupControls: [
                            new TextBoxControl({
                                key: 'testGroupTextBox1',
                                label: 'testGroupLabel1'
                            })
                        ]
                    }),

                ],
                controlsPerRow: 2
            });

            const groupedControls = service.groupControls(groupControl);

            expect(groupedControls.length).toEqual(2);
            expect(groupedControls[0][0].key).toEqual('testTextBox1');
            expect(groupedControls[0][1].key).toEqual('testTextBox2');
            expect(groupedControls[1][0].key).toEqual('testGroup1');
        });

        it('should group correctly when only one group is provided', () => {
            const groupControl = new GroupControl({
                key: 'testGroup',
                groupControls: [
                    new GroupControl({
                        key: 'testGroup1',
                        groupControls: [
                            new TextBoxControl({
                                key: 'testGroupTextBox1',
                                label: 'testGroupLabel1'
                            })
                        ]
                    }),
                ],
                controlsPerRow: 1
            });

            const groupedControls = service.groupControls(groupControl);

            expect(groupedControls.length).toEqual(1);
            expect(groupedControls[0][0].key).toEqual('testGroup1');
        });

    });
});
