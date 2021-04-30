export const Announcement = [
    {
    subject: 'Test Announcement',
    short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper rutrum velit nec hendrerit. Nullam quis dui a sapien venenatis elementum. Phasellus euismod, magna a interdum blandit, ex velit imperdiet ligula, eu vestibulum justo nisi sed nunc. Praesent sed ex nec eros volutpat maximus vitae quis mi. Sed dictum fermentum nulla, eget sagittis diam.',
    body: 'New Announcement 1 ',
    isActive: true,
    photo_path_original: '',
    photo_path_crop: '',
    date: new Date(),
},
{
    subject: 'Test Announcement',
    short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper rutrum velit nec hendrerit. Nullam quis dui a sapien venenatis elementum. Phasellus euismod, magna a interdum blandit, ex velit imperdiet ligula, eu vestibulum justo nisi sed nunc. Praesent sed ex nec eros volutpat maximus vitae quis mi. Sed dictum fermentum nulla, eget sagittis diam.',
    body: 'New Announcement 2 ',
    isActive: true,
    photo_path_original: '',
    photo_path_crop: '',
    date: new Date(),
}
]

export interface Announcement {
    subject: string,
    short_description: string,
    body: string,
    isActive: boolean,
    photo_path_original,
    photo_path_crop,

}

