import Worker from "../clustering/worker/Worker"
import { APIGuildMember, APIMessage } from "discord-api-types";

import { Embed } from './Embed'
import { MessageTypes } from "../rest/resources/Messages";

import { PermissionsUtils, bits } from '../utils/Permissions'

export class CommandContext {
  public args: string[] = []

  constructor (private worker: Worker, public message: APIMessage) {}

  /**
   * Guild where the message was sent
   */
  get guild () {
    return this.worker.guilds.get(this.message.guild_id)
  }

  /**
   * Channel where the message was sent
   */
  get channel () {
    return this.worker.channels.get(this.message.channel_id)
  }

  get member (): APIGuildMember {
    return {
      ...this.message.member,
      user: this.message.author
    }
  }

  /**
   * Replies to the invoking message
   * @param data Data for message
   */
  reply (data: MessageTypes) {
    return this.worker.api.messages.send(this.message.channel_id, data, {
      message_id: this.message.id,
      channel_id: this.message.channel_id,
      guild_id: this.message.guild_id
    })
  }

  /**
   * Sends a message in the same channel as invoking message
   * @param data Data for message
   */
  send (data: MessageTypes) {
    return this.worker.api.messages.send(this.message.channel_id, data)
  }

  /**
   * Deletes the invoking message
   */
  delete () {
    return this.worker.api.messages.delete(this.message.channel_id, this.message.id)
  }

  /**
   * Makes an embed to send
   * @example
   * ctx.embed
   *   .title('Hello')
   *   .send()
   */
  get embed () {
    return new Embed((embed, reply) => {
      if (reply) this.reply(embed)
      else this.send(embed)
    })
  }

  hasPerms (perms: keyof typeof bits): boolean {
    return PermissionsUtils.calculate(this.member, this.guild, this.worker.guildRoles.get(this.guild.id), perms)
  }

  myPerms (perms: keyof typeof bits): boolean {
    return PermissionsUtils.calculate(this.worker.selfMember.get(this.message.guild_id), this.guild, this.worker.guildRoles.get(this.guild.id), perms)
  }
}