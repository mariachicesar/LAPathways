 [HttpGet("forgot"), AllowAnonymous]
        public ActionResult<SuccessResponse> ForgotPassword(string email)
        {
            ObjectResult result = null;
            try
            {

                int id = _service.ForgotPassword(email);

                Guid token = Guid.NewGuid();

                _tokenService.Add(id, token);

                _emailService.ResetEmail(email, token, _sendGridKey);


                ItemResponse<int> response = new ItemResponse<int> { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());

                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPost("reset"), AllowAnonymous]
        public ActionResult<ItemResponse<int>> GetUserByGuid(UpdatePassword model)
        {
            ObjectResult result = null;
            try
            {
                int id =_service.ResetPassword(model);
                                                       
                result = Ok200(new SuccessResponse());
         
            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }
            return result;
        }
