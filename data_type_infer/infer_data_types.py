import pandas as pd

class InferDataType:
    def __init__(self, filepath) -> None:
        self.filepath = filepath
        self.df = pd.read_csv(filepath)
        self.infer()

    def infer(self):
        for col in self.df.columns:
            # Attempt to convert to numeric first
            df_converted = pd.to_numeric(self.df[col], errors='coerce')
            if not df_converted.isna().all():  # If at least one value is numeric
                self.df[col] = df_converted
                continue

            # Attempt to convert to datetime
            try:
                self.df[col] = pd.to_datetime(self.df[col])
                continue
            except (ValueError, TypeError):
                pass

            # Check if the column should be categorical
            threshold = 0.5  # Example threshold for categorization
            if len(self.df[col].unique()) / len(self.df[col]) < threshold:
                self.df[col] = pd.Categorical(self.df[col])

    def manual_infer(self, column, type):
        if type == 'number':
            self.df[column] = pd.to_numeric(self.df[column], errors='coerce')
        elif type == 'date':
            self.df[column] = pd.to_datetime(self.df[column])
        elif type == 'category':
            self.df[column] = pd.Categorical(self.df[column])
        elif type == 'text':
            self.df[column] = self.df[column].astype(str)
        else:
            raise ValueError('Invalid type')

    @property
    def columns(self):
        return self.df.dtypes.astype(str).to_dict()
    
    @property
    def rows(self):
        return self.df.astype(str).to_dict()    

