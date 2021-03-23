module.exports = {
	event: 'messageDelete',
	execute: async (client, message) => {

		let settings = await message.guild?.settings;

		if (settings?.log_messages) {
			if (message.system) return;

			let msg = await client.db.models.Message.findOne({
				where: {
					id: message.channel.id
				}
			});

			if (msg) {
				msg.deleted = true;
				await msg.save(); // save changes to message row
			}
		}
	}
};