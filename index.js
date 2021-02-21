const Discord = require('discord.js');
const bot = new Discord.Client();

    DisTube = require('distube'),
    client = new Discord.Client(),
    config = {
        prefix: '1',
        token: process.env.TOKEN || "NzkyNzYxMzIzNzYyNjE0Mjcy.X-iahA.cRAFdQEyrjSh3pI9tioG98pTVEE"};

    const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

    bot.login("NzkyNzYxMzIzNzYyNjE0Mjcy.X-iahA.v6p9MD_xgCXjvpeKadEXnuOgnG4");
    
bot.on("ready", () => {
    console.log("Login Successfully");
    bot.user.setPresence({status: "notdistrub",activity: { name: "TBCA Čōmmunitÿ | 1about",  type: "LISTENING" }});});
    
    const validateFlag = f => f === 'true' || f === 'false' || f === 'null';
    const IGNORED = new Set([801450592533741599]);
    
    module.exports = {
      run: async(bot, message, args) => {
        if(args.split(' ').length !== 2) 
          return message.channel.send('1lock <ROLE_ID> TRUE | FALSE | NULL');
        let [ roleId, flag ] = args.split(' ');
        if(!isNaN(roleId) && validateFlag(flag.toLowerCase())) {
          if(message.guild.roles.cache.has(roleId)) {
            flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null);
            const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(channel => {
              if(!IGNORED.has(channel.id)) {
                channel.updateOverwrite(roleId, {
                  SEND_MESSAGES: !flag
                }).then(g => {
                  console.log(`Updated ${g.name} (${g.id})`); 
                  if(flag) {
                    if(!g.name.endsWith('🔒')) {
                      g.edit({ name: g.name + ' 🔒'});
                    }
                  } else {
                    g.edit({ name: g.name.replace(/\s*🔒/, '')});
                  }
                })
                .catch(err => console.log(err));
              } else {
                console.log(`Skipping ${channel.name} (${channel.id})`);
              }
            });
          }
          else {
            message.channel.send('Invalid Role.');
          }
        }
      },
      aliases: ['lockdown'],
      description: 'locksdown a channel'
    } 

bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if (command == "play")
        distube.play(message, args.join(""));
    if (command == "p")
        distube.play(message, args.join(""));
    if (["repeat"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));
    if (["loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0])
    );

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("👋ออกจากช่องเสียงเรียบร้อยเเล้วค่ะ!");}
    if (command == "dc") {
        distube.stop(message);
        message.channel.send("👋ออกจากช่องเสียงเรียบร้อยเเล้วค่ะ!");}
    if (command == "skip")
        distube.skip(message);
        if (command == "s")
        distube.skip(message);
    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('คิวตอนนี้:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));}
    if (command == "q") {
        let queue = distube.getQueue(message);
        message.channel.send('คิวตอนนี้:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));}});

const status = (queue) => `ระดับเสียง: \`${queue.volume}%\`| ลูป: \`${queue.repeatMode ? queue.repeatMode == 2 ? "คิวทั้งหมด" : "เพลงเดียว" : "ปิด"}\` | เล่นอัติโนมัติ: \`${queue.autoplay ? "เปิด" : "ปิด"}\``;

distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `กำลังเล่น \`${song.name}\` - \`${song.formattedDuration}\`\nถูกขอโดย: ${song.user}\n${status(queue)}`))
    .on("addSong", (message, queue, song) => message.channel.send(
        `เพิ่ม ${song.name} - \`${song.formattedDuration}\` ในคิวโดย ${song.user}`))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `เล่น \`${playlist.name}\` เพลย์ลิสต์ (${playlist.songs.length} songs).\nถูกขอโดย: ${song.user}\nกำลังเล่นอยู่ตอนนี้ \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `เพิ่ม \`${playlist.name}\` เพลย์ลิสต์ (${playlist.songs.length} songs) ในคิว\n${status(queue)}`))
    .on("ผลลัพธ์การค้นหา", (message, result) => {
        let i = 0;
        message.channel.send(`**โปรดเลือกตัวเลือกด้านล่าง**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*โปรดเลือกตัวเลขมาภายใน 60 วินาที*`);})
    .on("ยกเลิกการค้นหา", (message) => message.channel.send(`ยกเลิกการค้นหา`))
    .on("error", (message, e) => { console.error(e)
        message.channel.send("An error encountered: " + e);});

const information = new Discord.MessageEmbed()
        .setColor('#66ffcc')
        .setTitle('**Information / เกี่ยวกับเซิร์ฟเวอร์**')
        .setDescription('**__[>〽TBCA Čōmmunitÿ〽<]__** เป็นเซิร์ฟเวอร์ของ<@651784096044941342>\nเเละมีผู้ที่ร่วมในการสร้างคือ<@488675808463028226>\nเมื่อเวลาผ่านไปก็ได้มีการปรับเปลี่ยนดิสคอร์ดจนมาถึงปัจจุบันนี้\nโดยเเต่ละห้องจะถูกเเบ่งออกเป็นโซนตามความเห็นชอบของผู้เป็นเจ้าของเซิร์ฟเวอร์\nทางเซิร์ฟเวอร์มี<@&804537673497837599>เป็นผู้ร่วมพัฒนาเซิร์ฟเวอร์\nมีระบบยศที่พอสมควรให้สำหรับเเต่ละคน\nสำหรับใครที่มาอ่านที่นี้ก่อนเเละยังไม่ได้ยืนยันตัวตนก่อนเข้ามาใช้งาน\nสามารถไปยืนยันตัวตนที่<#800565079417683979> ด้วยการกดอิโมจิ "✅"\nเเละสามารถเข้าไปพูดคุยได้ที่ <#705046494734057612> ได้เลยทันที')
        .setImage('https://scontent.fbkk24-1.fna.fbcdn.net/v/t1.0-9/42984066_437056286817498_4597646332977479680_n.png?_nc_cat=108&ccb=3&_nc_sid=730e14&_nc_eui2=AeE7dDqEIv_NQKmDpQIpdxcR2PClT-6SUSfY8KVP7pJRJyD4531JQLjje2oyaVrleTiFjT-uufzQTtivZjtTXzhy&_nc_ohc=eqhgtD2mAmsAX8oMM-r&_nc_ht=scontent.fbkk24-1.fna&oh=bf978cf39748388ab3e6ac080941ed9e&oe=604A3E74')
        .setFooter('Image credit : https://www.facebook.com/miku.fanart/posts/437056330150827/')
        .setTimestamp()
        .setFooter('TBCA Discord' ,'http://static.zerochan.net/Hatsune.Miku.full.3059032.png')
        
const information2 = new Discord.MessageEmbed()
        .setColor('#66ffcc')
        .setDescription('สำหรับคนที่เข้าเซิร์ฟเวอร์มาทางอื่นๆ\nอาจจะยังไม่รู้ว่ามีทางเซิร์ฟเวอร์ก็มีเพจเฟซบุ๊ค\nอย่าลืมไปติดตามที่เพจกันด้วยน้า\nลิ้งก์เพจ : https://www.facebook.com/TheBlackcosanime')
        .setImage('https://lh3.googleusercontent.com/iM1Plm9hf6eRm2h5kF4ufN61OG5HLLiOLDn6Yf9kKpUTFIMqlNCVH9LeSjBdCCci_Zv33B62-t3cigy3Ob2uSj06taGHEkUJbR-OeMCnkpT1OGnCNV95-peFlUac3HrwEP1d4Al8Nfhx8P1MzSp4seqeDNbfl7Ma_bskeJ7gpuBmF5xgzRz3gxA93tgDbhGpn5-960OC0AZlz3Ol3zyX-NKp8BCSRLBDfbThg3E4hv4bO_k6OxNf7QCxKUZGQY8rZirJT5wIyD_fTa4orYezDv1MR4L_UyPld1TmBeBSKR--e_0kknbd6R1Qtsp-PAaijlL4N6FDTL0pJk-U85LCNpf1TT7lhLtw_V2wgIbrlyJKgVnAlwy69XlX0SJcU-qrc5O57qlutv7EyPl7eQGXdeQ9K8xCiznT4fnOqjGrDvYYaVPQH-M5se8JlkY8G8vUeM3FIe8V4pzfoBm06GYpzYBaxKcIVcApnvD0m61NuNVhfxkwe5aGqbJNZMKf08ZA3kFn6gmmO4ZnCKeOQmWTdjzBnTrxnPdIM0U2gjDIC5lrM2v5k4OxLWyW8c8W280AxhnblVM0KiIgP5kfA1HVFNTS52BXp3VAGiUmO_HTzjAkd7BiFDTImcEue7qRzph-sUiZABh81WVGAr6FvmlPAdND8MMjnGLfEhQePnaCQJD_64QdEplHcbbZx15fFw=w953-h533-no?authuser=0')
        .setTimestamp()
        .setFooter('TBCA Discord' ,'http://static.zerochan.net/Hatsune.Miku.full.3059032.png')

const information3 = new Discord.MessageEmbed()
        .setColor('#66ffcc')
        .setTitle('**การใช้ห้องเเชทต่างๆ**')
        .setDescription('ในเรื่องของห้องเเชทต่างๆที่มีจำนวนมากอาจจะทำให้มีคนสับสนบ้างเป็นธรรมดา\nดังนั้นนี่คือรายละเอียดของทุกห้องนะคะ\n__**โซนที่ 1**___🔐—[>〽TBCA Čōmmunitÿ〽<]\n-<#809391732159676416>สำหรับการอธิบายรายละเอียดต่างๆ\n-<#703873858389671967>สำหรับการอธิบายเรื่องกฏเเละการใช้งาน\n-<#705404031543017573>มีไว้เพื่อเเจ้งข่าวสารต่างๆ\n-<#801804187100250152>สำหรับการโดเนทให้กับ**C.E.O**สุดหล่อของพวกเรา\n-<#805580061503127552>สำหรับการเเจ้งเตือนคนที่บูสต์เซิร์ฟเวอร์\n-<#705408112479436830>ไว้สำหรับอธิบายเรื่องของยศ\n-<#800573873292705803>สำหรับการกดรับยศฟรี\n__**โซนที่2**___🔐—{#🏁Welcome🚩#}\n-<#705046642549588078>เป็นห้องต้อนรับสมาชิกใหม่\n-<#800565079417683979>สำหรับใครที่ยังไม่ได้ยืนยันตัวตน\n   ไปที่ห้องนี้อย่างเร็วไปเลยนะคะ\n-<#703873888383270983>เป็นห้องเเนะนำตัวของสมาชิก#>')
        .setImage('https://i.pinimg.com/originals/13/d2/a5/13d2a51cacae49c35f88f5939399a953.png')
        .setTimestamp()
        .setFooter('TBCA Discord' ,'http://static.zerochan.net/Hatsune.Miku.full.3059032.png')

bot.on("message" , message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    
    if(message.content === "1info"){
            message.channel.send(information)
            message.channel.send(information2)
            message.channel.send(information3)
            message.delete()}


const shopEmbed = new Discord.MessageEmbed()
    .setColor('#66ffcc')
    .setTitle('Category\nประเภทสินค้า')
    .setDescription('ขายสินค้าที่เกี่ยวกับยศ\nไม่ได้มีสิทธิพิเศษอะไรมากเเค่เอามาอวดคนอื่นได้เฉยๆ\n**ยศ**\n-<@&801747353002049546> ราคา 1,000,000DT\n-<@&801747356756082689> ราคา 750,000DT\n-<@&801747355937406986> ราคา 600,000DT\n-<@&801747354013270077>ราคา 500,000DT\n-<@&801747361927659592> ราคา 450,000DT\n-<@&801747364146184192> ราคา 200,000DT\n-<@&801747365223464960> ราคา 100,000DT\n-<@&801747360010600458> ราคา 50,000DT\n-<@&801747366809436191> ราคา 10,000DT\nติดต่อซื้อขายได้ที่ <@&801753624271126559>')
    .setImage('https://i.pinimg.com/originals/14/59/7b/14597bf8688f496d57a85a0ef000532f.png')
    .setTimestamp()
    .setFooter('TBCA Discord' ,'http://static.zerochan.net/Hatsune.Miku.full.3059032.png')
    if(message.content === "1list"){
    message.channel.send(shopEmbed)
    message.delete()}
        
const menuEmbed = new Discord.MessageEmbed()
    .setColor('#66ffcc')
    .setTitle('Menu\nรายการอาหาร')
    .setDescription('**ประเภทอาหาร**(ภาษีมันเยอะต้องเข้าใจกันเนาะ)\n**__ของคาว__**\n\n1.ทงคัตสึ\n2500DT/จาน\n\n2.ราเมน \n1750DT/จาน \n\n3.ข้าวเเกงกระหรี่ \n1900DT/จาน\n\n4.ทาโกะยากิ \n200DT/ชิ้น\n\n5.ซูชิเเซลมอน\n400DT/ชิ้น\n\n6.เบอร์เกอร์(หมู,ไก่,เนื้อ,ปลา) \n2350DT/ชิ้น\n\n7.Hot dogs\n700DT/ชิ้น\n\n8.พิซซ่า\n4250DT/ถาด\n\n9.ซี่โครงบาร์บีคิว \n7500DT/ชิ้น\n\n10.สปาเก็ตตี้คาโบนาร่า  \n2900DT/จาน\n\n11.เป็ดปักกิ่ง  \n5000DT/จาน\n\n12.หมูหัน  \n6300DT/ตัว\n\n13.เกี๊ยวน้ำ\n1400DT/จาน\n\n14.ปอเปี๊ยะ\n1500DT/ชุด\n\n15.ติ่มซำ\n1000DT/ชุด\n\n**__ของหวาน__**\n\n1.ดังโงะ\nไม้ละ 150DT\n\n2.ไดฟุกุ(8ชิ้น)\nชุดละ 2900DT\n\n3.โดรายากิ\nชิ้นละ 250DT\n\n4.เมล่อนปัง\nชิ้นละ 650DT\n\n5.ไทยากิ\nชิ้นละ 425DT\n\n6.โมจิ\nชุดละ 1375DT\n\n7.ชีสเค้ก\nชิ้นละ 600DT\n\n8.ไอติมเเท่ง\nเเท่งละ 150DT\n\n9.พายสัปปะรด\nชิ้นละ 625DT\n\n10.เเพนเค้ก\nจานละ 700DT\n\n11.บิงซู\nถ้วยละ 950DT\n\n12.ฮันนี่โทสต์\nจานละ 550DT\n\n13.บราวนี่(4ชิ้น)\nชุดละ 1000DT\n\n14.ชูครีม(3ชิ้น)\nชุดละ 1100DT\n\n15.พุดดิ้ง\nจานละ 1125DT\n\n\n**__เครื่องดื่ม__**\n\n1.ชาเขียว\nเเก้วละ 450DT\n\n2.ชามะนาว\nเเก้วละ 350DT\n\n3.ชามะลิ\nเเก้วละ 350DT\n\n4.เอสเปรสโซ\nเเก้วละ 550DT\n\n5.ลาเต้\nเเก้วละ 525DT\n\n6.มอคค่า\nเเก้วละ 550DT\n\n7.คาปูชิโน\nเเก้วละ 550DT\n\n8.นมสด\nเเก้วละ 400DT\n\n9.น้ำผลไม้\nเเก้วละ 275DT\n\n10.น้ำอัดลม\nเเก้วละ 250DT\n\n11.ชานม\nเเก้วละ 600DT\n\n12.โอริโอ้ปั่น\nเเก้วละ 450DT\n\n13.ช็อคโกเเลตร้อน\nเเก้วละ 375DT\n\n14.นมเย็น\nเเก้วละ 390DT\n\n15.น้ำเปล่า\nเเก้วละ 120DT\n\nหากต้องการซื้อติดต่อที่<@&802475640996757504>')
    .setImage('https://i.pinimg.com/originals/f5/91/1b/f5911b6b69ca9a114372a5cf890807a6.gif')
    .setTimestamp()
    .setFooter('TBCA Discord' ,'http://static.zerochan.net/Hatsune.Miku.full.3059032.png')
    if(message.content === "1menu"){
    message.channel.send(menuEmbed)
    message.delete()}

    const shop2Embed = new Discord.MessageEmbed()
    .setColor('#66ffcc')
    .setTitle('Spacial Category\nสินค้าพิเศษ')
    .setDescription('สินค้าพิเศษในช่วงวันวาเลนไทน์\nสามารถเซื้อมามอบให้คนที่คุณรักได้จนถึงสิ้นเดือนนะคะ\n**ชื่อสินค้าเเละราคา**\n-<@&810288240233676810> ราคา 1,000DT\n-<@&810319363642228776> ราคา 2,000DT\n-<@&810319364845994044> ราคา 4,000DT\n-<@&810319366678904863>ราคา 9,000DT\n-<@&807589553367810079> ราคา 11,000DT\n-<@&807589552180166696> ราคา 36,000DT\nติดต่อซื้อขายได้ที่ <@&801753624271126559>')
    .setImage('https://lh3.googleusercontent.com/proxy/ZSr-STWdHgRgBBm1xgs8Hb1ixUvcaR4_U1UrRX1LxJRhN71Sy3Mf8Z6dSxSMKISjeToqeJzBm0JhD5PbsQJYeNdNy3i-YncV1sCHSfM')
    .setTimestamp()
    .setFooter('TBCA Discord' ,'http://static.zerochan.net/Hatsune.Miku.full.3059032.png')
    if(message.content === "1event"){
    message.channel.send(shop2Embed)
    message.delete()}


});


