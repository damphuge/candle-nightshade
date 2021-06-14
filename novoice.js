const Discord = require('discord.js')

/*
 * ミュートボイチャ用テキストチャンネルを見えるようにする
 * @param {Discord.VoiceState} oldState
 * @param {Discord.VoiceState} newState
 */
const addGrantViewingNoVoiceChannel = (oldState, newState) => {
  if (oldState.channel) {
    return;
  }
  if (!newState.channel) {
    return;
  }

  const member = newState.member;
  const roleId = config?.novoice?.roleId;
  if (!roleId) {
    console.error("config.novoice.roleId is null")
    return
  }

  const role = member.guild.roles.cache.find((id, _) => id === roleId)
  if (!role) {
    console.error(`cannot find role(<@${roleId}>)`)
    return
  }

  member.roles.add(role, "ボイチャ参加したから")
  return
};

const removeGrantViewingNoVoiceChannel = (oldState, newState) => {
  if (!oldState.channel) {
    return;
  }
  if (newState.channel) {
    return;
  }

  const member = newState.member;
  const roleId = config?.novoice?.roleId;
  if (!roleId) {
    console.error("config.novoice.roleId is null")
    return
  }

  const role = member.guild.roles.cache.find((id, _) => id === roleId)
  if (!role) {
    console.error(`cannot find role(<@${roleId}>)`)
    return
  }

  member.roles.remove(role, "ボイチャ抜けたから")
  return
}

export {
  addGrantViewingNoVoiceChannel,
  removeGrantViewingNoVoiceChannel
};
