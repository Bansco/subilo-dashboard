**Trigger job that succeeds**

```
curl -X POST 'https://tsearch.xyz/subilo-demo/webhook' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1OTgzODAwNTUsImlhdCI6MTU5NTc1MjA1NSwiaXNzIjoic3ViaWxvOmFnZW50IiwidXNlciI6eyJwZXJtaXNzaW9ucyI6WyJqb2I6d3JpdGUiXX19.Gaus556HY714QD6gNlgDvApYyvu0AWiW3To1-vQ1P4PVN-BQrzxOB6H5D3KTnJ8iPRBJb439UEYqYoeWujFrGw' \
  -d '{ "name": "potential-spork" }'
```

**Trigger job that fails**

```
curl -X POST 'https://tsearch.xyz/subilo-demo/webhook' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1OTgzODAwNTUsImlhdCI6MTU5NTc1MjA1NSwiaXNzIjoic3ViaWxvOmFnZW50IiwidXNlciI6eyJwZXJtaXNzaW9ucyI6WyJqb2I6d3JpdGUiXX19.Gaus556HY714QD6gNlgDvApYyvu0AWiW3To1-vQ1P4PVN-BQrzxOB6H5D3KTnJ8iPRBJb439UEYqYoeWujFrGw' \
  -d '{ "name": "studious-disco" }'
```
