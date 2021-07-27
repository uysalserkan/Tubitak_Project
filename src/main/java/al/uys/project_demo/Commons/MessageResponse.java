package al.uys.project_demo.Commons;

import al.uys.project_demo.Commons.enums.MessageResponseType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MessageResponse extends Throwable {
  private final String message;
  private final MessageResponseType messageResponseType;

  public boolean hasError() {
    return messageResponseType.equals(MessageResponseType.ERROR);
  }
}
