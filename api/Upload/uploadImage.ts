export async function uploadImageToCloudinary(
  image: any
): Promise<string | undefined> {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "tindercucei");
  data.append("cloud_name", "du2j41pda");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/du2j41pda/image/upload`,
      {
        method: "post",
        body: data,
      }
    );

    const result = await response.json();

    return result.url;
  } catch (e) {
    return undefined;
  }
}
