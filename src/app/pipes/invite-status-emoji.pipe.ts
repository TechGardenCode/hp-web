import { Pipe, PipeTransform } from '@angular/core';
import { InviteStatus } from '../model/event.model';

@Pipe({
  name: 'inviteStatusEmoji'
})
export class InviteStatusEmojiPipe implements PipeTransform {

  transform(status: InviteStatus): string {{
    switch (status) {
      case 'ACCEPTED':
        return '👍';
      case 'MAYBE':
        return '🤔';
      case 'DECLINED':
        return '👎';
      case 'PENDING':
        return '💌';
      default:
        return '';
    }
  }
  }

}
