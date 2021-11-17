import mongoose from 'mongoose';

const url = 'mongodb://admin:admin@localhost:27017';
mongoose.connect(url).then(() => console.log('connected'));
export const Text = mongoose.model(
	'text',
	new mongoose.Schema({ text: String }),
);
export const doek = 'mans';
