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
	name: string;
}

export const ATMA_EVENT_INIT_MODEL: AtmaEvent = {
    'id': '',
    'facebookURL': null,
    'eventbriteURL': null,
    'description': 'description',
	'thumbnail': null,
	'startDate': new Date(),
	'name': 'untitled',
};
