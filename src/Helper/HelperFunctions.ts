export default class Helper {
  // Helper to embed YouTube video from URL
  public static handleYouTubeURL(url: string): string {
    if(!this.isValidUrl(url)) return "";
    const match = url?.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  }

  public static isValidUrl(url:string | null | undefined) : boolean{
    try{
      if(!url) return false;
      new URL(url);
      return true;
    }
    catch{
      return false;
    }
  }
}
