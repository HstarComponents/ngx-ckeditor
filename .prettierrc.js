module.exports = {
  parser: 'babylon',
  printWidth: 120, // 每行最大120字符
  semi: true, // 末尾分号
  singleQuote: true, // 使用单引号
  overrides: [
    {
      files: ['*.json', '.eslintrc', '.tslintrc', '.prettierrc', '.tern-project'],
      options: {
        parser: 'json',
        tabWidth: 2
      }
    },
    {
      files: '*.{css,sass,scss,less,styl}',
      options: {
        parser: 'css',
        tabWidth: 2
      }
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript'
      }
    }
  ]
};
