const Discord = require("discord.js");
const mysql = require("mysql");

var con = mysql.createConnection({
  host: 'databaseAddress',
  user: 'DBuser',
  password: 'DBpass',
  database: 'botDatabase'
});

con.connect(err => {
  if (err)
    throw err;
  console.log("Connected to database.");
});


module.exports = {
  addXP: function (message, min, max, cmd)
  {
    let experience = Math.floor(Math.random() * (max - min)) + min;
    let gs = message.guild.roles.find("name", "LesGarsSûrs");
    if (gs)
    {
      gs.members.forEach(gmember =>
      {
        if (gmember.id == message.author.id)
        {
        experience = 1.5 * experience;
        console.log(`LesGarsSûrs bonus xp for ${message.author.username}`);
        }
      });
    }
	let now = new Date();
	let today = now.getDay();
	if (today == 4)
		experience += experience;
	else
		console.log("regular day, no bonus");
    con.query(`SELECT * FROM experience WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`, (err, rows) => {
      if (err)
        throw err;
      let sql;
      if (rows.length < 1)
        sql = `INSERT INTO experience (id, xp, guild, lastGain) VALUES ('${message.author.id}', ${experience}, '${message.guild.id}', '${Date.now()}')`;
      else
      {
        let lastGain = rows[0].lastGain;
        let cooldown = parseInt(lastGain) + (60 * 1000);
        if (cooldown >= parseInt(Date.now()) && cmd == 1)
        {
          console.log(`${message.author.username} gained xp too recently`);
          return ;
        }
        let total = rows[0].xp + experience;
        console.log(`${message.author.username} gained ${experience}xp`);
        sql = `UPDATE experience SET xp = ${total} , lastGain = '${Date.now()}' WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`;
      }
      con.query(sql, (e) => {
        if (e)
          throw e;
      });
    });
  }
}
