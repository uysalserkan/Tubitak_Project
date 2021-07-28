package al.uys.project_demo.Configuration;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.Commons.enums.MessageResponseType;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// import javax.persistence.EntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  public MessageResponse handleValidationException(MethodArgumentNotValidException exception) {
    return new MessageResponse(
        exception.getFieldErrors().get(0).getDefaultMessage(), MessageResponseType.ERROR);
  }

  // ! bu method açık kalınca kullanıcılar eventlere kayıt olamıyor..
  //  @ExceptionHandler(value = EntityNotFoundException.class)
  //  public MessageResponse handleGlobal(EntityNotFoundException exception) {
  //    return new MessageResponse(exception.getMessage(), MessageResponseType.ERROR);
  //  }
}
