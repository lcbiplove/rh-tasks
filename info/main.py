# %%

import pandas as pd


import pandas as pd

class InferDataType:
    def __init__(self, filepath) -> None:
        self.filepath = filepath
        self.df = pd.read_csv(filepath)

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

        return self.df.dtypes.astype(str).to_dict()

# Test the function with your DataFrame
print("Data types before inference:")
data = InferDataType('sample_data.csv')
df = data.infer()
print("\nData types after inference:")
print(df)
dict = data.df.to_dict()
print("\nDict:")
print(data.df.to_dict())
print("\nONE")
# %%
