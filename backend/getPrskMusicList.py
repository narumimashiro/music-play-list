# プロセカ楽曲リストを取得するLambda

import os
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):

    #data
    dynamodb = boto3.resource('dynamodb')
    table_name = os.environ['TABLE_NAME']
    dynamo_table = dynamodb.Table(table_name)
    partition_key = os.environ['PARTITION_KEY']
    partition_value = os.environ['PARTITION_VALUE']

    response = dynamo_table.query(
        KeyConditionExpression=Key(partition_key).eq(partition_value)
    )
    items = response['Items']

    return items