import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(data.message)
    }
  }

  private parseMessage(message: string): PostMessage {
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg)/gmi;
    const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;
    const audioRegex = /http[s]?:\/\/.+\.(mp3|ogg|wav)/gmi;
    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const attachements: MessageElement[] = [];

    const pictureMatche = pictureRegex.exec(message);
    if (pictureMatche) {
      const picture: MessageImageElement = 
        {
          url : message,
          type : "image"
        };
      attachements.push(picture);
    }

    const videoMatche = videoRegex.exec(message)
    if (videoMatche) {
      const video: MessageVideoElement = 
        {
          url : message,
          type : "video"
        };
      attachements.push(video);
    }

    const audioMatche = audioRegex.exec(message)
    if (audioMatche) {
      const audio: MessageAudioElement = 
      {
        url : message,
        type : "audio"
      };
    attachements.push(audio);
    }

    const youtubeMatche = youtubeRegex.exec(message)
    if (youtubeMatche) {

    }

    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }
}
