import * as bcrypt from 'bcryptjs';

export const hashData = async (data: string): Promise<string> => {
  return await bcrypt.hash(data, 10);
};
