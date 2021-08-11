
class MessageResponse {
  final message;
  final messageResponseType;

  MessageResponse({required this.message, required this.messageResponseType});

  factory MessageResponse.fromJson(Map<String, String> json) {
    return new MessageResponse(
      message: json['message'],
      messageResponseType: json['messageResponseType'],
    );
  }
}
