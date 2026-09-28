-- Demonstration uniquement : aucune table ni donnee n'est modifiee.
-- Depuis SQLcl, lance a la racine du depot et connecte a DEMO_ENV :
-- @migrations/V001__demo_select.sql
-- Ce script peut etre rejoue ; aucun suivi automatique des migrations n'est installe.

select 'V001 - Migration de demonstration executee' as resultat,
       sys_context('USERENV', 'SESSION_USER') as utilisateur,
       sys_context('USERENV', 'CURRENT_SCHEMA') as schema_courant,
       sys_context('USERENV', 'DB_NAME') as base,
       systimestamp as execute_le
from dual;
