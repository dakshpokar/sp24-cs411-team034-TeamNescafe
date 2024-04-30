create trigger applicationtrigger
after
update
    on unit for each row begin
set
    @userid = (
        select
            user_id
        from
            applications
        where
            unit_id = new.unit_id
            and status = 'approved'
    );

if new.availability = 0 then
update
    applications
set
    status = "rejected"
where
    unit_id = new.unit_id
    and user_id != @userid;

end if;

end;