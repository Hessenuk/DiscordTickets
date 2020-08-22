/**
 * 
 *  @name DiscordTickets
 *  @author eartharoid <contact@eartharoid.me>
 *  @license GNU-GPLv3
 * 
 */

const ChildLogger = require('leekslazylogger').ChildLogger;
const log = new ChildLogger();
const { MessageEmbed } = require('discord.js');
const config = require('../../user/config');

module.exports = {
	name: 'stats',
	description: 'View ticket stats.',
	usage: '',
	aliases: ['data', 'statistics'],
	example: '',
	args: false,
	async execute(client, message, args, Ticket) {

		const guild = client.guilds.cache.get(config.guild);

		let open = await Ticket.count({ where: { open: true } });
		let closed = await Ticket.count({ where: { open: false } });

		message.channel.send(
			new MessageEmbed()
				.setColor(config.colour)
				.setTitle(':bar_chart: Statistics')
				.addField('Open tickets', open, true)
				.addField('Closed tickets', closed, true)
				.addField('Total tickets', open + closed, true)
				.setFooter(guild.name, guild.iconURL())
		);
	}
};