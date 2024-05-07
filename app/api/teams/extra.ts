import {Knock} from "@knocklabs/node";

const knock = new Knock(process.env.KNOCK_API_KEY)

export async function notifyTeamAddition(actorId: string, recipientIds: string[], teamName: string) {
  await knock.notify('add-in-team', {
    actor: actorId,
    recipients: recipientIds,
    data: {
      team: {
        name: teamName
      }
    }
  });
}