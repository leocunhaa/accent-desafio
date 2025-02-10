Feature: Gerenciamento em massa de Web Tables

  Scenario: Criar e excluir 12 registros de forma dinâmica
    Given que acesso a página "https://demoqa.com/webtables"
    When adiciono 12 novos registros com os seguintes dados:
      | First Name | Last Name | Email                  | Age | Salary | Department |
      | Teste1     | Iron        | teste1@automacao.com   | 25  | 4000   | TI        |
      | Teste2     | Swift      | teste2@automacao.com   | 30  | 5000   | QA        |
      | Teste3     | Sousa      | teste3@automacao.com   | 35  | 6000   | DevOps    |
      | Teste4     | Silva       | teste4@automacao.com   | 40  | 7000   | Infra     |
      | Teste5     | Alberto       | teste5@automacao.com   | 45  | 8000   | TI        |
      | Teste6     | Marcio       | teste6@automacao.com   | 50  | 9000   | QA        |
      | Teste7     | Melo        | teste7@automacao.com   | 28  | 5500   | DevOps    |
      | Teste8     | Cruise       | teste8@automacao.com   | 33  | 6200   | QA     |
      | Teste9     | Rock       | teste9@automacao.com   | 38  | 7500   | TI        |
      | Teste10    | Downey        | teste10@automacao.com  | 27  | 4300   | QA        |
      | Teste11    | Kelce       | teste11@automacao.com  | 32  | 5900   | DevOps    |
      | Teste12    | Stephen       | teste12@automacao.com  | 37  | 7100   | QA     |
    Then todos os registros devem estar visíveis na tabela
    When excluo todos os novos registros criados
    Then os registros não devem mais estar na tabela
