const prefix = "-";
const paypalEmail = "management@aboveholdings.net"
const Discord = require('discord.js');
const useRole = "Executive"; // Role required to use the command
const client = new Discord.Client();

// Bot Startup
client.on('ready', () => {
	client.user.setActivity('Procedurally generating PayPal invoices...');
	console.log(`Bot is activated, and ready for action: ${client.user.tag}`);
});

// Commands
client.on('message', msg => {
	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
	if (msg.author.bot) return;
	if (!msg.content.startsWith(prefix)) return;

	// Members
	if (command === "invoice") {
		if (msg.member.roles.some(r=>[useRole].includes(r.name))) {
			let price = args[0];
			let service = args.slice(1).join(" ");
			let serviceEncoded = encodeURIComponent(service.trim());
			let url = "https://www.paypal.com/cgi-bin/webscr?&cmd=_xclick&business=";
			let url2 = "&currency_code=USD&amount=";
			let url3 = "&item_name=";
			let url4 = "&no_shipping=1";
			if (msg.channel.type === "dm") return msg.author.send("This command can not be used in private messages.");
			if (args.length >= 2) {
				if (!(isNaN(args[0]))) {
					invoiceURL = url + paypalEmail + url2 + price + url3 + serviceEncoded + url4;
					const embed = new Discord.RichEmbed()
						.setAuthor(msg.author.tag, msg.author.avatarURL)
				 		.setColor(0x00AE86)
				 		.setFooter("$" + price + " invoice generated.")
				 		.setThumbnail("https://www.freepnglogos.com/uploads/paypal-logo-png-7.png")
				 		.setTimestamp()
				 		.addField("Price:", price, true)
				 		.addBlankField(true)
				 		.addField("Service:", service, true)
				 		.addBlankField(true)
				 		.addField("Pay Now:", "Click [here](" + invoiceURL + ") to pay the invoice.", true)
				 		msg.channel.send({embed});
				 		console.log("User " + msg.author.tag + " generated an invoice.");
				} else {
					msg.channel.send("Correct Usage: >invoice <price> <service>");
				}
			} else if (args.length == 1) {
				msg.channel.send("Correct Usage: >invoice <price> <service>");
			} else if (args.length === 0) {
				msg.channel.send("Correct Usage: >invoice <price> <service>");
			}
		} else {
			console.log("User " + msg.author.tag + " tried to generate an invoice.");
		}
	}
});



// Fix Bot Loop
client.on('message', message => {
	if (message.author.bot) return;
})

// Client Login
client.login('');