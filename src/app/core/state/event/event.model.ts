/**
 * The main data model specifying an ATMA Event
 */
export interface AtmaEvent {
    id: string;
    facebookURL: URL | null;
    eventbriteURL: URL | null;
    description: string;
	thumbnail: URL | null;
	startDate: Date;
	startTime: string;
	endDate: Date;
	endTime: string;
	name: string;
}

export const ATMA_EVENT_INIT_MODEL: AtmaEvent = {
    'id': '',
    'facebookURL': null,
    'eventbriteURL': null,
    'description': 'description',
	'thumbnail': null,
	'startDate': new Date(),
	'startTime': "",
	'endDate': new Date(),
	'endTime': "",
	'name': 'untitled',
};
