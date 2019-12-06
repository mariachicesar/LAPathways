   public int ForgotPassword(string email)
        {
            string procName = "[dbo].[NAME_SelectByEmail]";
            int id = 0;


            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
              
                col.AddWithValue("@Email", email);
               
            }, delegate (IDataReader reader, short set)
            {
                id = reader.GetSafeInt32(0);
            }
            );

            return id;
        }
        
        public int ResetPassword(UpdatePassword model)
        {

            string procName = "[dbo].[NAME_ResetPassword]";
            int id = 0;

            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Guid", model.Token);
                paramCollection.AddWithValue("@Password", getHash(model.Password));
            }
            );
            return id;
        }
